import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";

import { InvitationPageRouteParams } from "../../router/routes/authenticationRoutes";
import { InvitationPageExplanation } from "./InvitationPageIntroduction";

export function InvitationPageContent() {
  const params = useParams<InvitationPageRouteParams>();
  const [acceptedInvitation, setAcceptedInvitation] = useState(false);

  const acceptInvitation = () => {
    setAcceptedInvitation(true);
  };

  if (!acceptedInvitation) {
    return <InvitationPageExplanation acceptInvitation={acceptInvitation} />;
  }

  return (
    <Fragment>
      <span>{params.id}</span>
    </Fragment>
  );
}