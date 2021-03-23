import './app.css';
import { Route } from 'react-router-dom';
import ProblemsPage from './problems/problems.page';
import ProblemPage from "./problem/problem.page"
import { Helmet } from 'react-helmet';

const App = () => {
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
