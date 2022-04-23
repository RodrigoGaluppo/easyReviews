import axios from "axios"

const api = axios.create({
    // https://avaliame.herokuapp.com/
    baseURL:"https://avaliame.herokuapp.com/",
})

export default api