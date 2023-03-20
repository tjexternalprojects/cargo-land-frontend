import classes from "./index.module.css";

export default function Wrapper(props: any) {
  return <div className={classes.Container}>{props.children}</div>;
}
