import { AuthenticatedRoute } from "@/components/AuthenticatedRoute";
import Home from "@/components/home/Home";
import Timer from "@/components/timer/Timer";
import { Route } from "react-router-dom";

export const AuthenticatedRoutePaths = [
    <Route path='/home' element={
        <AuthenticatedRoute>
          <Home/>
        </AuthenticatedRoute>
      } />,
      <Route path='/timer' element={
        <AuthenticatedRoute>
          <Timer/>
        </AuthenticatedRoute>
      } />
]