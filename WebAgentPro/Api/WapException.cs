using System;
using System.Collections.Generic;
using System.Globalization;

namespace WebAgentPro
{
    // Custom exception class for throwing application specific exceptions (e.g. for validation) 
    // that can be caught and handled within the application
    public class WapException : Exception
    {
        public List<string> Details = new List<string>();

        public WapException() : base() { }

        public WapException(string message) : base(message) { }

        public WapException(string message, params object[] args)
            : base(String.Format(CultureInfo.CurrentCulture, message, args))
        {
        }

        public WapExceptionViewModel AsViewModel()
        {
            return new WapExceptionViewModel()
            {
                Message = Message,
                Details = Details
            };
        }
    }

    public class WapExceptionViewModel
    {
        public string Message;
        public List<string> Details;
    }
}
