export type SubmissionState = "idle" | "sending" | "success" | "error" | "unavailable";

export async function submitPublicForm(endpoint: string, payload: Record<string, unknown>) {
  if (!endpoint) throw new Error("FORM_ENDPOINT_UNAVAILABLE");

  const response = await fetch(endpoint, {
    method: "POST",
    mode: "cors",
    credentials: "omit",
    cache: "no-store",
    referrerPolicy: "strict-origin-when-cross-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) throw new Error("FORM_SUBMISSION_FAILED");
}

export function formDataObject(form: HTMLFormElement) {
  return Object.fromEntries(new FormData(form).entries());
}
