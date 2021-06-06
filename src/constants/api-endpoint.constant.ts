/**
 * React JS APP
 *
 */
export class ApiEndpoint {
  public static API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  public static API_V1_URL = `${ApiEndpoint.API_BASE_URL}`;

  public static USER_URL = `http://localhost:3000/user`;
}
