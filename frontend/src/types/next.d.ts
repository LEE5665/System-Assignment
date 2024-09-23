declare module 'next' {
  interface CheckProps {
    userid: string;
  }
  interface RouteParams {
    params: CheckProps;
  }
}
