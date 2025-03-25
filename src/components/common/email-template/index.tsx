import * as React from "react";
import { EmailTemplateProps } from "./email-template.types";

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = (
  props: EmailTemplateProps
) => (
  <div>
    <h1>Welcome, {props.firstName}!</h1>
  </div>
);
