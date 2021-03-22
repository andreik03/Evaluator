import React, { useEffect } from 'react';
import './app.css';
import ApiService from "../shared/services/api-service";
import { Route } from 'react-router-dom';
import ProblemsPage from './problems/problems.page';
import ProblemPage from "./problem/problem.page"
import { Helmet } from 'react-helmet';

const App = () => {
  /*
    useEffect(() => {
      fetchApi();
    });
  
    const fetchApi = () => {
      console.log("Fetching")
  
      ApiService.getProblems().then(res => console.log(res))
    }
  */
  return (
    <div className="App">
      <Helmet>
        <title>Evaluator</title>
      </Helmet>
      <Route exact path="/" component={ProblemsPage} />
      <Route exact path="/problem-details/:problemId" component={ProblemPage} />
    </div>
  );
}

export default App;
