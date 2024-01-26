import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

// Authorization middleware
const authorizationMiddleware =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Get the user session
      const session = await getSession({ req });

      // Check if the user is authenticated
      if (!session?.user) {
        res.redirect(401, "/login");
        return res.status(401).json({ error: "Unauthorized" });
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
