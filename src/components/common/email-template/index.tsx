import * as React from "react";
import { EmailTemplateProps } from "./email-template.types";

export const EmailTemplate = (props: EmailTemplateProps) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f9fafb",
      borderRadius: "8px",
    }}
  >
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "6px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div
        style={{
          borderBottom: "2px solid #5eead4",
          paddingBottom: "15px",
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            color: "#0f172a",
            fontSize: "24px",
            fontWeight: "bold",
            margin: "0",
          }}
        >
          New Contact Form Submission
        </h1>
        <p
          style={{
            color: "#64748b",
            fontSize: "14px",
            margin: "5px 0 0",
          }}
        >
          Received on {props.date}
        </p>
      </div>

      <div style={{ marginBottom: "25px" }}>
        <h2
          style={{
            color: "#0f172a",
            fontSize: "18px",
            fontWeight: "bold",
            margin: "0 0 15px",
          }}
        >
          Contact Information
        </h2>

        <div
          style={{
            backgroundColor: "#f1f5f9",
            padding: "15px",
            borderRadius: "4px",
            marginBottom: "15px",
          }}
        >
          <p style={{ margin: "0 0 8px", color: "#334155" }}>
            <strong style={{ color: "#0f172a" }}>Name:</strong> {props.name}
          </p>
          <p style={{ margin: "0", color: "#334155" }}>
            <strong style={{ color: "#0f172a" }}>Email:</strong>{" "}
            <a href={`mailto:${props.email}`} style={{ color: "#0ea5e9" }}>
              {props.email}
            </a>
          </p>
        </div>
      </div>

      <div>
        <h2
          style={{
            color: "#0f172a",
            fontSize: "18px",
            fontWeight: "bold",
            margin: "0 0 15px",
          }}
        >
          Message
        </h2>

        <div
          style={{
            backgroundColor: "#f1f5f9",
            padding: "15px",
            borderRadius: "4px",
            whiteSpace: "pre-wrap",
            color: "#334155",
            lineHeight: "1.5",
          }}
        >
          {props.message}
        </div>
      </div>

      <div
        style={{
          marginTop: "30px",
          paddingTop: "20px",
          borderTop: "1px solid #e2e8f0",
          textAlign: "center" as const,
        }}
      >
        <a
          href={`mailto:${props.email}?subject=Re: Your Contact Form Submission`}
          style={{
            backgroundColor: "#5eead4",
            color: "#0f172a",
            padding: "10px 20px",
            borderRadius: "4px",
            textDecoration: "none",
            fontWeight: "bold",
            display: "inline-block",
          }}
        >
          Reply to {props.name}
        </a>
      </div>
    </div>

    <div
      style={{
        textAlign: "center" as const,
        marginTop: "20px",
        color: "#64748b",
        fontSize: "12px",
      }}
    >
      <p>This email was sent from your portfolio website contact form.</p>
    </div>
  </div>
);
