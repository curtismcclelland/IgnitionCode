namespace WebAgentPro.Api.Models
{
    public class WidgetPart
    {
        public long ID { get; set; }
        public long WidgetID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual Widget Widget { get; set; }
    }
}
