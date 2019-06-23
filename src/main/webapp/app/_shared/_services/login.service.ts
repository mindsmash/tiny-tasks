import {Observable} from "rxjs";
import {Token} from "app/_shared/_dto/token";

/**
 * Service interface for implementations that handle login of tiny tasks.
 */
export interface LoginService {

  /**
   * Logs user in.
   *
   * @param username credentials to login
   * @param password credentials to login
   */
  login(username: string, password: string): Observable<Token>;

}
