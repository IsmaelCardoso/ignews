import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { query as q } from "faunadb";

import { fauna } from "../../../services/fauna";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: "read:user",
    }),
  ],
  callbacks: {
    async signIn({ email }) {
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(email)))
            ),
            q.Create(q.Collection("users"), { data: { email } }),
            q.Get(q.Match(q.Index("user_by_email"), q.Casefold(email)))
          )
        );

        return true;
      } catch {
        return false;
      }
    },
  },
});

//FaunaDB - HTTP (vamos usar este pois atende bem ao modelo de serveless)
// DynamoDB - AWS
// PostgreSQL, MongoDB (precisa manter uma conecção aberta)
