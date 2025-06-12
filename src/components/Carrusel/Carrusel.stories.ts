import type { Meta, StoryObj } from "@storybook/react";
import Carrusel from "./Carrusel";

const meta: Meta<typeof Carrusel> = {
  title: "Componentes/Fecha/Carrusel",
  component: Carrusel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Carrusel>;

export const Default: Story = {
  args: {
    data: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    onValueChange: (index: number) => {
      console.log("Día seleccionado:", index);
    },
  },
};
