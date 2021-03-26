import { Problem } from "../models/problem.model"

const getCookie = (name: string) => {
    let cookieValue = "";
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
const csrftoken: string = getCookie('csrftoken');
const baseUrl = "http://127.0.0.1:8000/api";

class ApiService {
    getProblems = () => fetch(`${baseUrl}/problem/list/`, { method: "GET" })
        .then(res => res.json());

    getProblemById(id: number) {
        return fetch(`${baseUrl}/problem/details/${id}`, { method: "GET" })
            .then(res => res.json());
    };

    getSolutionsById(id: number) {
        return fetch(`${baseUrl}/solution/list/${id}`, { method: "GET" })
            .then(res => res.json());
    };

    postProblem(problem: Problem) {
        console.log(problem);
        return fetch(`${baseUrl}/problem/create/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken,
                },
                body: JSON.stringify({ ...problem }),
            }).then(res => res.json());
    };
}

export default new ApiService();