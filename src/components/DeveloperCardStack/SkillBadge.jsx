import { 
  FaReact, 
  FaNodeJs, 
  FaFigma, 
  FaDocker, 
  FaPython, 
  FaAws,
  FaEthereum
} from "react-icons/fa";
import { 
  SiTypescript, 
  SiMongodb, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiFramer, 
  SiExpress, 
  SiRedis, 
  SiPostgresql,
  SiFirebase,
  SiRedux,
  SiKubernetes,
  SiTerraform,
  SiTensorflow,
  SiPytorch,
  SiFastapi,
  SiSolidity
} from "react-icons/si";

const iconMap = {
  "React": <FaReact className="text-[#61DAFB]" />,
  "React Native": <FaReact className="text-[#61DAFB]" />,
  "Node.js": <FaNodeJs className="text-[#339933]" />,
  "Node": <FaNodeJs className="text-[#339933]" />,
  "TypeScript": <SiTypescript className="text-[#3178C6]" />,
  "MongoDB": <SiMongodb className="text-[#47A248]" />,
  "Figma": <FaFigma className="text-[#F24E1E]" />,
  "Next.js": <SiNextdotjs className="text-white" />,
  "Tailwind CSS": <SiTailwindcss className="text-[#06B6D4]" />,
  "Framer Motion": <SiFramer className="text-white" />,
  "Express": <SiExpress className="text-white/80" />,
  "Redis": <SiRedis className="text-[#DC382D]" />,
  "Docker": <FaDocker className="text-[#2496ED]" />,
  "AWS": <FaAws className="text-[#FF9900]" />,
  "Python": <FaPython className="text-[#3776AB]" />,
  "PostgreSQL": <SiPostgresql className="text-[#4169E1]" />,
  "Firebase": <SiFirebase className="text-[#FFCA28]" />,
  "Redux": <SiRedux className="text-[#764ABC]" />,
  "Kubernetes": <SiKubernetes className="text-[#326CE5]" />,
  "Terraform": <SiTerraform className="text-[#844FBA]" />,
  "TensorFlow": <SiTensorflow className="text-[#FF6F00]" />,
  "PyTorch": <SiPytorch className="text-[#EE4C2C]" />,
  "FastAPI": <SiFastapi className="text-[#009688]" />,
  "Ethereum": <FaEthereum className="text-[#62688F]" />,
  "Solidity": <SiSolidity className="text-[#363636]" />,
};

const SkillBadge = ({ skill, showIcon = true }) => {
  const icon = showIcon ? iconMap[skill] : null;

  return (
    <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#161C33]/60 px-3 sm:px-3.5 py-1 sm:py-1.5 text-xs font-semibold text-gray-200 transition-colors hover:border-violet-500/30 hover:bg-[#1C2442]/80">
      {icon && <span className="text-xs sm:text-sm flex items-center">{icon}</span>}
      <span>{skill}</span>
    </span>
  );
};

export default SkillBadge;