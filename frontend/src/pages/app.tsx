import './app.css';
import { Route } from 'react-router-dom';
import ProblemsPage from './problems/problems.page';
import ProblemPage from "./problem/problem.page"
import { Helmet } from 'react-helmet';
import SignUpPage from './signup/signup.page';
import LogInPage from './login/login.page';

const App = () => {
  return (
    <div className="App">
      <Helmet>
        <title>Evaluator</title>
      </Helmet>
      <Route exact path="/" component={ProblemsPage} />
      <Route exact path="/problem/details/:problemId" component={ProblemPage} />
      <Route exact path="/signup" component={SignUpPage} />
      <Route exact path="/login" component={LogInPage} />
    </div>
  );
}

export default App;
