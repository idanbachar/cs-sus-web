import NextAuth from "next-auth";
import type { NextRequest } from "next/server";
import { authOptions, getAuthProviders } from "@/lib/auth/options";

async function auth(
	req: NextRequest,
	ctx: {
		params: Promise<{
			nextauth: string[];
		}>;
	}
) {
	const params = await ctx.params;

	return NextAuth(req, { params }, {
		...authOptions,
		providers: getAuthProviders(req),
	});
}

export { auth as GET, auth as POST };
