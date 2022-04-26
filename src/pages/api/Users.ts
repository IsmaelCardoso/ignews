import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const users = [
    { id: 1, name: "Ismael" },
    { id: 2, name: "Ricco" },
    { id: 3, name: "Dan" },
  ];

  return res.json(users);
};

//Serverless
