import { Button } from "@mui/joy";

const ToggleButton = (props) => {
  const { text, pressed, onClick, style} = props;

  return (
      <Button
        style={style}
        color='primary'
        variant='outlined'
        onClick={onClick}
        aria-pressed={pressed ? "true" : "false"}
        sx={(theme) => ({
          [`&[aria-pressed='true']`]: {
            ...theme.variants.outlinedActive.primary,
            borderColor: theme.vars.palette.primary.outlinedHoverBorder,
          },
          scale: '1.6'
        })}
      >
        {text}
      </Button>
  );
};

export default ToggleButton
