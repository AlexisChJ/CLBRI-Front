import Buttons from "./Buttons";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Buttons> = {
  title: "Components/Buttons",
  component: Buttons,
  tags: ["autodocs"],
  args: {
    text: "Iniciar Sesión",
    color: "login",
  },
  argTypes: {
    color: {
      control: "select",
      options: ["login", "register"],
    },
    text: {
      control: "text",
    },
  },
};

export default meta;           
type Story = StoryObj<typeof Buttons>;

export const Login: Story = {};

export const Register: Story = {
  args: {
    text: "Registrarse",
    color: "register",
  },
};
