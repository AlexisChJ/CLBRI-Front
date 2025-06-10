import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { SwitchDemo } from "./Switch";

const meta: Meta<typeof SwitchDemo> = {
  title: "Components/SwitchDemo",
  component: SwitchDemo,
};

export default meta;
type Story = StoryObj<typeof SwitchDemo>;

const SwitchDemoStory = () => {
  const [checked, setChecked] = useState(false);
  return <SwitchDemo checked={checked} onCheckedChange={setChecked} />;
};

export const Default: Story = {
  render: () => <SwitchDemoStory />,
};