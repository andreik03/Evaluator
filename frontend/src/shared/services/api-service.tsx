// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Problem } from "../models/problem.model"

const getCookie = (name: string) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const csrftoken = getCookie('csrftoken');
const uri = "http://127.0.0.1:8000/api";

class ApiService {
    getProblems = () => fetch(`${uri}/problem-list/`, { method: "GET" })
        .then(res => res.json());

    getProblemById(id: number) {
        return fetch(`${uri}/problem-details/${id}`, { method: "GET" })
            .then(res => res.json());
    }

    getSolutionsById(id: number) {
        return fetch(`${uri}/solution-list/${id}`, { method: "GET" })
            .then(res => res.json())
    }
}

export default new ApiService();