import type { Context } from "hono";

type GetNoteByIdHandler = ({
  userId,
}: {
  userId: string;
}) => Promise<{
  content: string;
}>;

export const getNoteByIdHandler: GetNoteByIdHandler = async ({ userId }) => {
  console.log(userId);

  // TODO: 実装

  return { content: "dummy data" };
};
