import { NavLink } from "react-router-dom";

const App = () => {
  return (
    <nav className="flex w-1/2 justify-between my-8 mx-auto">
      <NavLink to="/paginated" className='border border-yellow-300 rounded-sm p-2'>Paginated</NavLink>
      <NavLink to="/parallel" className='border border-yellow-300 rounded-sm p-2'>Parallel</NavLink>
      <NavLink to="/optimistic" className='border border-yellow-300 rounded-sm p-2'>Optimistic</NavLink>
      <NavLink to="/dependant" className='border border-yellow-300 rounded-sm p-2'>Dependant</NavLink> 
    </nav>
  );
};

export default App;
