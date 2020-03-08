import axios from 'axios';

export default class CurdApi {

  static postData(selectedFile, replacePhotoPath, data, selectedCity, history) {
    if (selectedFile) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("path", replacePhotoPath);
      axios.post('http://localhost:8080/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        this.postProfile(data, selectedCity, history);
      })
      .catch((error) => {
        // handle this error
        console.log('error: ' + error);
      })
    }
  }

  static postProfile(data, selectedCity, history) {
    let profile = {
      id: data.id>0? data.id : null,
      display_name: data.display_name? data.display_name : '',
      real_name: data.real_name? data.real_name : '',
      birth_date: data.birth_date? data.birth_date : '',
      height: data.height? data.height : 0,
      city_location: selectedCity? selectedCity : '' ,
      occupation: data.occupation? data.occupation : '',
      about_me: data.about_me? data.about_me : '',
      gender: data.gender? data.gender :'',
      marital_status: data.marital_status? data.marital_status : '',
      ethnicity: data.ethnicity? data.ethnicity : '',
      religion: data.religion? data.religion : '',
      figure: data.figure? data.figure : ''
    }

    axios.post('http://localhost:8080/profile', profile)
      .then(res => {
        history.push({
          pathname: "/OnSubmit",
          state: {
            response: res.data,
            msgVariant: "success"
          }
        })
      }).catch((error) => {
        // handle this error
        history.push({
          pathname: "/OnSubmit",
          state: {
            response: error.message,
            msgVariant: "danger"
          }
        })
      })
  }

  static async getAllProfiles() {
    try {
      const response = await fetch(`http://localhost:8080/all/profile`);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}