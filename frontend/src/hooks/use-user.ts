import { UPDATE_USER } from "@/graphql/mutations/user";
import { useMutation } from "@apollo/client/react";

export const useUser = () => {
  const [updateUserMutation] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_IDEA, variables: { ideaId } }],
    onCompleted: () => {
      setCommentContent("");
    },
  });

  return {
    updateUserMutation,
  };
};
