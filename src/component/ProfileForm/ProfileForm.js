import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import ErrorMessage from "./ErrroMessage";
import SelectEthnicity from './SelectEthnicity'
import SelectReligion from './SelectReligion'
import SelectFigure from './SelectFigure'
import citiesJson from './cities.json';
import CurdApi from '../Utility/CurdApi'
import "./ProfileForm.css";

function ProfileForm(props) {
  const form = useForm();
  const {
    register,
    handleSubmit,
    errors
  } = form;
  const history = useHistory();
  const [dateType, setDateType] = useState('text');
  const [selectedFile, setSelectedFile] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [title, setTitle] = useState('');
  const [profileId, setProfileId] = useState(0);
  const [editPhotoText, setEditPhotoText] = useState('');
  const [replacePhotoPath, setReplacePhotoPath] = useState('');
  const [profile, setProfile] = useState({
    display_name: '',
    real_name: '',
    birth_date: '',
    height: 0,
    city_location: '',
    occupation: '',
    about_me: '',
    gender: '',
    marital_status: '',
    ethnicity: '',
    religion: '',
    figure: '',
    file_download_uri: ''
  });

  const onSubmit = (data, e) => {
    e.target.reset();
    e.preventDefault();

    if (profileId > 0) {
      data.id = profileId;
    }

    CurdApi.postData(selectedFile, replacePhotoPath, data, selectedCity, history);

    // clear state
    setSelectedCity('');
    setImagePreviewUrl('');
    setImagePreview('');
    setEditPhotoText('');
    setReplacePhotoPath('');
  }



  const fileChangedHandler = event => {
    setSelectedFile(event.target.files[0]);
    let reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    }
    reader.readAsDataURL(event.target.files[0])

  }

  const disallowMarkupText = input => {
    const regex = /^[a-zA-Z0-9,\\. ä å ö A Å Ö ]*$/;
    if (regex.test(input.target.value)) {
      setProfile({ ...profile, [input.target.name]: input.target.value });
    } else {
      let lastChar = input.target.value.substr(input.target.value.length - 1);
      alert("Markup text is not allowed, please remove: " + lastChar);
    }
  }


  useEffect(() => {

    if (props.match.params.title) {
      setTitle(props.match.params.title);
    } else if (props.location.state) {
      if (props.location.state.title) {
        setTitle(props.location.state.title);
      }
    }

    if (props.location.state) {
      if (props.location.state.profile) {
        setProfile(props.location.state.profile);
        setProfileId(props.location.state.profile.id);
        props.location.state.profile.fileDownloadUri? 
        setEditPhotoText(<a href={props.location.state.profile.fileDownloadUri} 
        target="_blank" rel="noopener noreferrer" > 
        Current Profile Photo</a>) : setEditPhotoText('');
        setReplacePhotoPath(props.location.state.profile.fileDownloadUri);
      }
    }

    if (imagePreviewUrl !== "") {
      const image = (
        <div>
          <br /> <img src={imagePreviewUrl} alt="icon" width="200" />
        </div>
      );
      setImagePreview(image);
    }

  }, [imagePreviewUrl, props.location.state, props.match.params.title]);


  return (
    <form onSubmit={handleSubmit(onSubmit)} >

      <h2><b>{title}</b></h2>

      <input value={profile.display_name}
        name="display_name" type="text"
        placeholder="Display Name"
        onChange={(input) => { disallowMarkupText(input) }}
        ref={register({ required: true })} />
      <ErrorMessage error={errors.display_name} />
      <br />

      <input value={profile.real_name}
        name="real_name" type="text"
        placeholder="Real Name"
        onChange={(input) => { disallowMarkupText(input) }}
        ref={register({ required: true })} />
      <ErrorMessage error={errors.real_name} />
      <br />

      <input value={profile.birth_date} name="birth_date"
        placeholder="Birth date" type={dateType}
        onChange={(input) => { setProfile({ ...profile, [input.target.name]: input.target.value }) }}
        onFocus={() => setDateType("date")} onBlur={() => setDateType("text")}
        ref={register({ required: true })} />
      <ErrorMessage error={errors.birth_date} />
      <br />

      <input value={profile.height}
        name="height" placeholder="Height in centimetre"
        onChange={(input) => { setProfile({ ...profile, [input.target.name]: input.target.value }) }}
        type="number" step="0.01" ref={register} />
      <br />

      <textarea value={profile.occupation == null ? '' : profile.occupation}
        name="occupation" placeholder="Your occupation"
        onChange={(input) => { disallowMarkupText(input) }}
        ref={register} />
      <br />

      <textarea value={profile.about_me == null ? '' : profile.about_me}
        name="about_me" placeholder="Tell us about yourself in free words"
        onChange={(input) => { disallowMarkupText(input) }}
        ref={register} />

      <label>Gender: </label>
      <select value={profile.gender == null ? '' : profile.gender}
        onChange={(input) => { setProfile({ ...profile, [input.target.name]: input.target.value }) }}
        name="gender" ref={register({ required: true })}>
        <option value="">Select...</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <ErrorMessage error={errors.gender} />

      <label> Currect city: </label>
      <select
        value={profile.city_location}
        name="city_location"
        ref={register({ required: true })}
        onChange={(event) => {
          setSelectedCity(event.target.value)
          setProfile({ ...profile, [event.target.name]: event.target.value })
        }}
      >
        <option value="">Select...</option>
        {
          citiesJson.cities.map((aCity) => {
            return (
              <option
                key={aCity.city}
                value={`${aCity.city}#${aCity.lat} ${aCity.lon}`}>
                {aCity.city}
              </option>
            );
          })
        }
      </select>
      <ErrorMessage error={errors.city_location} />

      <label>Marital Status: </label>
      <select value={profile.marital_status}
        onChange={(input) => { setProfile({ ...profile, [input.target.name]: input.target.value }) }}
        name="marital_status" ref={register({ required: true })}>
        <option value="">Select...</option>
        <option value="neverMarried">Never Married</option>
        <option value="divorced">Divorced</option>
        <option value="married">Married</option>
        <option value="separated">Separated</option>
        <option value="widowed">Widowed</option>
        <option value="registeredPartnership">Registered partnership</option>
      </select>
      <ErrorMessage error={errors.marital_status} />

      <label >Ethnicity: </label>
      <SelectEthnicity profile={profile} setProfile={setProfile} form={form} />

      <label>Religion: </label>
      <SelectReligion profile={profile} setProfile={setProfile} form={form} />

      <label>Figure: </label>
      <SelectFigure profile={profile} setProfile={setProfile} form={form} />

      <br />
      <label style={{ display: 'inline' }}>Profile picture:</label>
      {editPhotoText }

      <input name="photo" className="Column" type="file" accept="image/*"
        onChange={(e) => { fileChangedHandler(e) }} 
        ref={register({ required: true })}/>
      <ErrorMessage error={errors.photo} />
      {imagePreview}

      <input type="submit" value="submit" />

    </form>

  );
}

export default ProfileForm;
