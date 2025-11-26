"use client";

interface ArchiveHeaderProps {
  readonly client: string;
  readonly role: string;
  readonly location: string;
}

export function ArchiveHeader({ client, role, location }: ArchiveHeaderProps) {
  return (
    <div className="pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Client Name - Large Title */}
        <div className="text-center mb-12">
          <h1 className="mt-24 text-[1rem] md:text-[4rem] lg:text-[7rem] xl:text-[10rem] font-bold leading-none text-content-primary tracking-tight">
            {client}
          </h1>
        </div>

        {/* Role and Location Info */}
        <div className="flex justify-between items-start max-w-4xl mx-auto">
          <div className="flex-1">
            <h2 className="mt-8 text-sm font-medium text-content-secondary uppercase tracking-wider mb-2">
              ROLE / SERVICES
            </h2>
            <p className="text-lg text-content-primary font-medium">
              {role}
            </p>
          </div>
          
          <div className="flex-1 text-right">
            <h2 className="mt-8 text-sm font-medium text-content-secondary uppercase tracking-wider mb-2">
              LOCATION & YEAR
            </h2>
            <p className="text-lg text-content-primary font-medium">
              {location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
