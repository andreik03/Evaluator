import './app.css';
import { Route } from 'react-router-dom';
import ProblemsPage from './problems/problems.page';
import ProblemPage from "./problem/problem.page"
import { Helmet } from 'react-helmet';
import RegisterPage from './register/register.page';
import LogInPage from './login/login.page';
import Header from '../shared/components/header';

const App = () => {
  return (
    <div className="App">
      <Helmet>
        <title>Evaluator</title>
      </Helmet>
      <Header/>
      <Route exact path="/" component={ProblemsPage} />
      <Route exact path="/problem/details/:problemId" component={ProblemPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/login" component={LogInPage} />
    </div>
  );
}

export default App;
