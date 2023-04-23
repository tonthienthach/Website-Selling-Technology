import instance from "./axios"

const url = "api/category"
const categoryApi = {
    getListCategory: ()=> instance.get(url),
}

export default categoryApi;