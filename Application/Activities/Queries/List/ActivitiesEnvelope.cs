using System.Collections.Generic;

namespace Application.Activities.Queries.List
{
    public class ActivitiesEnvelope
    {
        public List<ActivityDto> Activities { get; set; }
        public int ActivitiesCount { get; set; }
    }
}
