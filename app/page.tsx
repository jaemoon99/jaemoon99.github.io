import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { Section } from "@/components/section";
import { TimelineItem } from "@/components/timeline-item";
import { SkillBadge } from "@/components/skill-badge";
import { ProjectCard } from "@/components/project-card";
import { Award, FileText, GraduationCap } from "lucide-react";
import { profileData } from "@/lib/profile-data";
import { Footer } from "@/components/footer";
import { SkillCard } from "@/components/skill-card";


const experiences = [
  {
    period: "2025.05 ~ 2025.07",
    title: "Design Sink",
    organization: "외주 프로젝트",
  },
  {
    period: "2024.07 ~ 2025.06",
    title: "삼성청년SW·AI아카데미",
    organization: "교육",
  },
  {
    period: "2023.03 ~ 2023.12",
    title: "멋쟁이사자처럼",
    organization: "동아리",
  },
  {
    period: "2022.03 ~ 2024.02",
    title: "계명대학교",
    organization: "컴퓨터공학과",
  },
  {
    period: "2018.03 ~ 2022.02",
    title: "계명문화대학교",
    organization: "컴퓨터학부",
  },
];

const awards = [
  {
    period: "2025.05",
    title: "자율 프로젝트 - 우수상",
    organization: "삼성청년SW·AI아카데미",
  },
  {
    period: "2025.02",
    title: "공통 프로젝트 - 우수상",
    organization: "삼성청년SW·AI아카데미",
  },
  {
    period: "2022.12",
    title: "창의 IT 경진대회 - 우수상",
    organization: "계명대학교",
  },
];

const certifications = [
  {
    period: "2025.09",
    title: "TOEIC Speaking - IM1",
    organization: "한국TOEIC위원회",
  },
  {
    period: "2024.12",
    title: "정보처리기사",
    organization: "한국산업인력공단",
  },
  {
    period: "2021.08",
    title: "PC정비사",
    organization: "한국정보통신자격협회",
  },
];

const publications = [
  {
    period: "2023.06",
    title: "Variational Auto Encoder와 비지도 학습을 이용한 사진 자동 분류 알고리즘",
    organization: "대한전자공학회학술대회",
    href: "https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11522309",
  },
];

const coreSkills = [
  {
    title: "Java",
    description: "람다식·Stream API, 멀티스레딩, 소켓을 활용한 채팅 프로그램 구현 경험",
    imagePath: "/java.png",
  },
  {
    title: "Spring",
    description: "MVC 패턴 및 RESTful API 구현, Lombok, JPA, STOMP 등 Boot 의존성 관리 및 테스트 코드 작성 경험",
    imagePath: "/spring.png",
  },
  {
    title: "MySQL",
    description: "Event Scheduler, Stored Procedure 경험",
    imagePath: "/mysql.png",
  },
  {
    title: "Docker",
    description: "docker-hub, compose, network 등 경험",
    imagePath: "/docker.png",
  },
  {
    title: "AWS",
    description: "EC2, Route53, S3, RDB 등 다양한 서비스 경험",
    imagePath: "/aws.png",
  },
  {
    title: "Git",
    description: "Git을 활용한 버전관리, Git-Hub/Lab을 활용한 협업, Git-Action 이용한 자동 배포 경험",
    imagePath: "/git.png",
  },
  {
    title: "Notion",
    description: "API 명세서 등 문서 제작, 데이터 베이스 사용 경험",
    imagePath: "/notion.png",
  },
  {
    title: "Figma",
    description: "와이어프레임, 프레젠테이션, 포트폴리오 제작 경험",
    imagePath: "/figma.png",
  },
];

const otherSkills = {
  frontend: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Vue.js"],
  backend: ["Python", "FastAPI", "Node.js", "Express"],
  database: ["MongoDB", "Firebase", "Redis"],
  "Infra & DevOps": ["NCP", "Linux", "Vercel", "Nginx"],
  tools: ["Jira", "Slack"],
};

import { projectsData } from "@/lib/projects-data";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero / About Section */}
        <HeroSection {...profileData} />

        {/* Experience Section */}
        <Section id="experience" title="Experience">
          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <TimelineItem key={index} {...exp} />
            ))}
          </div>
        </Section>

        {/* Skills Section */}
        <Section id="skills" title="Skills">
          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6">Core Skills</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {coreSkills.map((skill, index) => (
                  <SkillCard
                    key={index}
                    title={skill.title}
                    description={skill.description}
                    imagePath={skill.imagePath}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6">Other Skills</h3>
              <div className="space-y-6">
                <SkillCategory title="Frontend" skills={otherSkills.frontend} />
                <SkillCategory title="Backend" skills={otherSkills.backend} />
                <SkillCategory title="Database" skills={otherSkills.database} />
                <SkillCategory title="Infra & DevOps" skills={otherSkills["Infra & DevOps"]} />
                <SkillCategory title="Tools" skills={otherSkills.tools} />
              </div>
            </div>
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects" title="Projects">
          <div className="grid gap-6 sm:grid-cols-2">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={index}
                slug={project.slug}
                title={project.title}
                description={project.overview}
                image={project.image}
                tags={project.techStack.map(tech => tech.name)}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
                period={project.period}
              />
            ))}
          </div>
        </Section>

        {/* Awards Section */}
        <Section id="awards" title="Awards & Certifications">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Awards */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Award className="h-5 w-5" />
                <h3 className="font-semibold">Awards</h3>
              </div>
              <div className="space-y-0">
                {awards.map((award, index) => (
                  <TimelineItem key={index} {...award} />
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <GraduationCap className="h-5 w-5" />
                <h3 className="font-semibold">Certifications</h3>
              </div>
              <div className="space-y-0">
                {certifications.map((cert, index) => (
                  <TimelineItem key={index} {...cert} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Publications Section */}
        <Section id="publications" title="Publications">
          <div className="flex items-center gap-2 text-primary mb-4">
            <FileText className="h-5 w-5" />
            <h3 className="font-semibold">Research Papers</h3>
          </div>
          <div className="space-y-0">
            {publications.map((pub, index) => (
              <TimelineItem key={index} {...pub} />
            ))}
          </div>
        </Section>


      </main>

      <Footer />
    </div>
  );
}

function SkillCategory({
  title,
  skills,
}: {
  title: string;
  skills: string[];
}) {
  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-3">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillBadge key={skill} name={skill} />
        ))}
      </div>
    </div>
  );
}
