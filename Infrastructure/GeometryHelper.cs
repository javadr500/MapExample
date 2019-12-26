
using GeoAPI.Geometries;
using NetTopologySuite;
using NetTopologySuite.Geometries;
using Coordinate = NetTopologySuite.Geometries.Coordinate;


namespace Map.Infrastructure
{
    public static class GeometryHelper
    {
        public static GeometryFactory GeometryFactory { get; set; }
            = NtsGeometryServices.Instance.CreateGeometryFactory(4326);

        public static Point CreatePoint(double lng, double lat)
        {
            return (Point)GeometryFactory.CreatePoint(new Coordinate(lng, lat));

        }
    }
}
