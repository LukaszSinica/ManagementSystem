import { AuthenticatedRoute } from "@/components/AuthenticatedRoute";
import Home from "@/components/home/Home";
import Timer from "@/components/timer/Timer";
import Users from "@/components/users/Users";
import { Route } from "react-router-dom";

export const AuthenticatedRoutePaths = [
    <Route key={"home"} path='/home' element={
        <AuthenticatedRoute>
          <Home/>
        </AuthenticatedRoute>
      } />,
      <Route key={"homePage"} path='/' element={
        <AuthenticatedRoute>
          <Home/>
        </AuthenticatedRoute>
      } />,
      <Route key={"timer"} path='/timer' element={
        <AuthenticatedRoute>
          <Timer/>
        </AuthenticatedRoute>
      } />,
      <Route key={"users"} path='/users' element={
        <AuthenticatedRoute requiredRole="ROLE_ADMINISTRATOR">
          <Users/>
        </AuthenticatedRoute>
      } />
]