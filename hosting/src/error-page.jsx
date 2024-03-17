import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.
// @ts-ignore
        statusText || error.message //error.statusText and error.message were being detected as ts errors, so they may
                                    //not be working.
        }</i>
      </p>
      <Link to="/">Take me back</Link>
    </div>
  );
}