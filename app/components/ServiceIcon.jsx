// components/ServiceIcon.tsx
"use client";

import {
  HammerIcon,
  HouseIcon,
  BuildingsIcon,
  ToolboxIcon,
  WrenchIcon,
  RulerIcon,
  ShovelIcon,
} from "@phosphor-icons/react";

export default function ServiceIcon({ type, size = 32, className }) {
  const icons = {
    hammer: HammerIcon,
    house: HouseIcon,
    buildings: BuildingsIcon,
    toolbox: ToolboxIcon,
    wrench: WrenchIcon,
    ruler: RulerIcon,
    shovel: ShovelIcon,
  };

  const IconComponent = icons[type];

  return <IconComponent size={size} className={className} />;
}
