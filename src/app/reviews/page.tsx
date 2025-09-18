"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RestaurantLayout } from "@/components/restaurant-layout";
import {
  Search,
  Filter,
  Star,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  MapPin,
  Reply,
} from "lucide-react";

import { reviews } from "@/constants/reviews";

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [filterRestaurant, setFilterRestaurant] = useState("all");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating =
      filterRating === "all" || review.rating.toString() === filterRating;
    const matchesRestaurant =
      filterRestaurant === "all" ||
      review.restaurant.toLowerCase().includes(filterRestaurant.toLowerCase());
    return matchesSearch && matchesRating && matchesRestaurant;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-400"
        }`}
      />
    ));
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-400";
    if (rating >= 3) return "text-yellow-400";
    return "text-red-400";
  };

  const handleReply = (reviewId: number) => {
    // Handle reply submission here
    console.log(`Replying to review ${reviewId}: ${replyText}`);
    setReplyingTo(null);
    setReplyText("");
  };

  return (
    <RestaurantLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Review Management</h1>
            <p className="text-gray-400 mt-1">
              Monitor and respond to customer reviews
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 rounded-xl bg-transparent"
            >
              <Filter className="mr-2 h-4 w-4" />
              Export Reviews
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search reviews by customer, restaurant, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-white/20 rounded-xl"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filterRating === "all" ? "secondary" : "outline"}
              onClick={() => setFilterRating("all")}
              className="rounded-xl border-white/20 text-white hover:bg-white/10"
            >
              All Ratings
            </Button>
            <Button
              variant={filterRating === "5" ? "secondary" : "outline"}
              onClick={() => setFilterRating("5")}
              className="rounded-xl border-white/20 text-white hover:bg-white/10"
            >
              5 Stars
            </Button>
            <Button
              variant={filterRating === "1" ? "secondary" : "outline"}
              onClick={() => setFilterRating("1")}
              className="rounded-xl border-white/20 text-white hover:bg-white/10"
            >
              1 Star
            </Button>
            <Button
              variant={filterRestaurant === "all" ? "secondary" : "outline"}
              onClick={() =>
                setFilterRestaurant(
                  filterRestaurant === "all" ? "bella" : "all"
                )
              }
              className="rounded-xl border-white/20 text-white hover:bg-white/10"
            >
              {filterRestaurant === "all" ? "All Restaurants" : "Bella Vista"}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <Card
              key={review.id}
              className="bg-black/20 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12 ring-2 ring-white/10">
                        <AvatarImage
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.customer}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                          {review.customer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white">
                            {review.customer}
                          </h3>
                          {review.verified && (
                            <Badge
                              className="text-xs border-0"
                              style={{
                                background: "#1C2B1C",
                                color: "#04C40A",
                              }}
                            >
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex items-center space-x-1">
                            {renderStars(review.rating)}
                          </div>
                          <span
                            className={`font-bold ${getRatingColor(
                              review.rating
                            )}`}
                          >
                            {review.rating}.0
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{review.restaurant}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1 text-sm text-gray-400">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{review.helpful}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">
                      {review.title}
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>

                  {review.response && (
                    <div className="mt-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="bg-blue-500/20 text-blue-300 border-0">
                          Restaurant Response
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm">{review.response}</p>
                    </div>
                  )}

                  {replyingTo === review.id ? (
                    <div className="mt-4 space-y-3">
                      <Textarea
                        placeholder="Write your response to this review..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-white/20 rounded-xl"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleReply(review.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                          Send Response
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyText("");
                          }}
                          className="border-white/20 text-white hover:bg-white/10 rounded-lg"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Helpful
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
                        >
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          Not Helpful
                        </Button>
                      </div>
                      {!review.response && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setReplyingTo(review.id)}
                          className="border-white/20 text-white hover:bg-white/10 rounded-lg"
                        >
                          <Reply className="h-4 w-4 mr-1" />
                          Reply
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <Card className="bg-black/20 border border-white/10 backdrop-blur-xl">
            <CardContent className="text-center py-12">
              <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No reviews found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </RestaurantLayout>
  );
}
