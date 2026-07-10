import {
  Cpu,
  Zap,
  Snowflake,
  HardHat,
  CircuitBoard,
  ShieldCheck,
  Network,
  Bot,
  Factory,
  Droplets,
  Landmark,
  Shield,
  TrainFront,
  Rocket,
  Box,
} from 'lucide-react';
import { categoryMap } from '../../data/platform';

const icons = {
  Cpu,
  Zap,
  Snowflake,
  HardHat,
  CircuitBoard,
  ShieldCheck,
  Network,
  Bot,
  Factory,
  Droplets,
  Landmark,
  Shield,
  TrainFront,
  Rocket,
};

export default function CategoryIcon({ category, size = 18, className }) {
  const meta = categoryMap[category];
  const Icon = (meta && icons[meta.icon]) || Box;
  return <Icon size={size} className={className} />;
}
