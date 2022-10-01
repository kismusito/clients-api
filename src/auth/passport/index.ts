import * as passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

import { CONFIG } from "../../utils/config";

import { MESSAGE_HANDLER } from "../../utils/enums/message-handler";
import { User } from "../../auth/models/user.model";

export class PassportConfig {
  private userRepository: typeof User;

  constructor() {
    this.userRepository = User;
  }

  init(): void {
    passport.initialize();
    this.jwtStrategy();
  }

  private jwtStrategy(): void {
    passport.use(
      new JWTStrategy(
        {
          secretOrKey: CONFIG.PRIVATE_KEY,
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (payload, done) => {
          const user = await this.userRepository.findOne({ id: payload.sub });

          if (!user) {
            return done({ message: MESSAGE_HANDLER.USER_NOT_FOUND }, false);
          }

          return done(null, user);
        }
      )
    );
  }
}
