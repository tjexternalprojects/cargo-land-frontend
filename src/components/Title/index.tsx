import classes from "./index.module.css";

export default function Title(props:any) {
  return <h1 className={classes.Container}>{props.children}</h1>;
}
