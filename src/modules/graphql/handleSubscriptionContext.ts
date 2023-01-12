// https://github.com/nestjs/graphql/issues/84
// connection is available for graphql subscription only with this,
// context doesn't work well with your decorators
// we hack a way to make them work by default ❤ with JWTGuard
const handleSubscriptionContext = ({
  req,
  connection,
}: {
  req: any;
  connection: any;
}) => {
  return connection
    ? {
        req: {
          ...connection.context,
          headers: { authorization: connection.context.Authorization },
        },
      }
    : { req };
};

export default handleSubscriptionContext;
