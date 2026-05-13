import { createCompleteUploadHandler } from "@/server/api/upload/completeHandlerFactory";
import { prismaDatabaseProvider } from "@/server/infrastructure/db/prisma/prismaDatabaseProvider";
import { betterAuthProvider } from "@/server/infrastructure/auth/betterAuthAdapter";

export const POST = createCompleteUploadHandler({
  auth: betterAuthProvider,
  db: prismaDatabaseProvider,
});

// import { NextResponse } from "next/server";
// import { auth } from "@/lib/auth/better-auth";
// import { prisma } from "@/server/infrastructure/db/prisma/prisma";
// import { ApiError } from "@/server/core/errors/ApiError";

// export async function POST(req: Request) {
//   try {
//     const session = await auth.api.getSession();
//     if (!session?.user) {
//       throw new ApiError(
//         "UNAUTHORIZED",
//         "Session expired or User not Logged In",
//         401,
//       );
//     }

//     const { key } = await req.json();

//     if (!key) {
//       throw new ApiError(
//         "NOT_FOUND",
//         "file KEY was missing from json request data",
//         404,
//       );
//     }

//     // Verify file exists AND belongs to the user
//     const file = await prisma.file.findUnique({
//       where: { r2Key: key },
//     });

//     if (!file) {
//       throw new ApiError(
//         "NOT_FOUND",
//         "File with provided KEY was not found in the DB",
//         404,
//       );
//     }

//     if (file.userId !== session.user.id) {
//       throw new ApiError(
//         "FORBIDDEN",
//         "User is not logged in or Session has expired",
//         404,
//       );
//     }

//     // Update file metadata
//     const res = await prisma.file.update({
//       where: { r2Key: key },
//       data: {
//         status: "SUCCESS",
//       },
//     });

//     // Respond to frontend
//     return NextResponse.json(
//       {
//         success: true,
//         data: {
//           message: "Successfully updated fie metadata",
//         },
//       },
//       {
//         status: 200,
//       },
//     );
//   } catch (err) {
//     if (typeof err === typeof ApiError) {
//       return NextResponse.json({
//         success: false,
//         error: err,
//       });
//     }
//     return NextResponse.json({
//       success: false,
//       error: {},
//     });
//   }
// }
