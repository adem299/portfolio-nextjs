import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { achievements } from "@/lib/data";

export default function AchievementsSection() {
  return (
    <Section id="achievements" label="Achievements" title="Certified & tested.">
      <Reveal>
        <ul className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
          {achievements.map((achievement) => {
            const isAward = achievement.type === "competition";
            return (
              <li key={achievement.title} className="flex flex-col gap-3 bg-background p-5">
                <span className={`label-mono ${isAward ? "text-accent" : ""}`}>
                  [{isAward ? "award" : "cert"}]
                </span>
                <span className="text-[15px] leading-snug">{achievement.title}</span>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}
