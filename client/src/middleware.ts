import { NextApiRequest, NextApiResponse } from "next";
//import { getSession } from "next-auth/react";

// Authorization middleware
const authorizationMiddleware =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const sessionCookie = req.cookies?.session;
      if (!sessionCookie) {
        res.writeHead(401, { Location: "/login" });
        return res.end();
      }

      const currentUser = JSON.parse(sessionCookie);

      // Check if the user is authenticated
      if (!currentUser || !currentUser.user) {
        res.writeHead(401, { Location: "/login" });
        return res.end();
      }

      // If authenticated, proceed to the next handler
      return await handler(req, res);
    } catch (error) {
      console.error("Authorization middleware error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

export const config = {
  matcher: ["/create", "/recipes/edit"],
};

export default authorizationMiddleware;
