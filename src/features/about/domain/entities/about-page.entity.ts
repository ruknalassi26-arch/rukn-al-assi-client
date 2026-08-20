import { AboutStatEntity } from "./stat.entity";
import { CoreValueEntity } from "./core-value.entity";
import { TimelineEventEntity } from "./timeline-event.entity";
import { TeamMemberEntity } from "./team-member.entity";
import { CompanyProfileEntity } from "./company-profile.entity";

export interface AboutPageEntity {
  heroImage?: string;
  storyImage?: string;
  company?: CompanyProfileEntity;
  stats: AboutStatEntity[];
  coreValues: CoreValueEntity[];
  timeline: TimelineEventEntity[];
  team: TeamMemberEntity[];
}
