using erp.Debugging;

namespace erp
{
    public class erpConsts
    {
        public const string LocalizationSourceName = "erp";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "07780fd598c0404fa65582bcbdcaf15c";
    }
}
