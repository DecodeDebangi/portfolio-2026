import { portfolioConfig } from "@/config/portfolio";

export function ExperienceSection() {
  return (
    <section 
      id="experience" 
      className="bg-[#141511] text-[#F5F5EF] py-24 md:py-32 px-5 md:px-8 lg:px-16 transition-colors duration-500"
    >
      <div className="max-w-[1440px] mx-auto">
      
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs font-mono text-[#A4A49A]">02</span>
          <div className="h-[1px] w-12 bg-[#45463F]"></div>
          <span className="text-xs font-mono text-[#A4A49A] tracking-widest uppercase">Experience</span>
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#F5F5EF] tracking-tight max-w-3xl leading-[1.1]">
            Software engineering roles from 2021 to the present.
          </h2>
          <div className="text-xs font-mono text-[#A4A49A] tracking-widest uppercase lg:pb-2">
            {portfolioConfig.experience.length} ROLES · CURRENT ROLE IN {portfolioConfig.location.split(',')[0]}
          </div>
        </div>
      </div>

      {/* Experience List */}
      <div className="border-t border-[#45463F]">
        {portfolioConfig.experience.map((job, index) => {
          const itemNumber = (index + 1).toString().padStart(2, "0");
          
          return (
            <div 
              key={job.id} 
              className="py-8 md:py-10 border-b border-[#37382F] group transition-colors hover:bg-[#23241E]/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4">
                
                {/* Index & Company / Role */}
                <div className="md:col-span-8 flex gap-6 md:gap-12">
                  <div className="text-xs font-mono text-[#A4A49A] pt-2 hidden sm:block">
                    {itemNumber}
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-medium text-[#F5F5EF] tracking-tight mb-2">
                      {job.company}
                    </h3>
                    <p className="text-base text-[#B7B8AE] mb-5">
                      {job.role}
                    </p>
                    
                    <div className="space-y-3 max-w-2xl">
                      {job.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start gap-4 text-[#B7B8AE]/90 text-[15px] leading-relaxed">
                          <span className="text-[#45463F] mt-0.5">—</span>
                          <p>{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dates & Location (Aligned to right on desktop) */}
                <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between md:justify-start lg:justify-end gap-2 md:gap-8 text-xs font-mono text-[#A4A49A] tracking-widest uppercase md:text-right pt-2">
                  <span>{job.dates}</span>
                  {/* Location is hardcoded based on prompt or omitted, let's use the main location if it's the current role, else omit or just use a generic one if we had it. We'll just display dates and let it be elegant. */}
                </div>
                
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
