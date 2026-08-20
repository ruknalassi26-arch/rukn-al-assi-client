import { CompanyProfileEntity } from "./company-profile.entity";
import { AboutStatEntity } from "./stat.entity";
import { CoreValueEntity } from "./core-value.entity";
import { TimelineEventEntity } from "./timeline-event.entity";
import { TeamMemberEntity } from "./team-member.entity";

export interface AboutPageEntity {
  company: CompanyProfileEntity;
  stats: AboutStatEntity[];
  coreValues: CoreValueEntity[];
  timeline: TimelineEventEntity[];
  team: TeamMemberEntity[];
}
