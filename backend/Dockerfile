# Use the official .NET Core SDK as a parent image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS webapi-build
WORKDIR /app

# Copy the project file and restore any dependencies (use .csproj for the project name)
COPY backend/*.csproj ./
RUN dotnet restore backend.csproj

# Copy the rest of the application code
COPY . .

# Publish the application
RUN dotnet publish backend/backend.csproj -c Release -o out
COPY backend/uploads /app/out/uploads

# Install Entity Framework Core tools
RUN dotnet tool install --global dotnet-ef --version 7.0

# Add the tools to the PATH
ENV PATH="${PATH}:/root/.dotnet/tools"

# Apply database migrations
RUN dotnet ef migrations add InitialProduction --startup-project backend/backend.csproj

# check if the migrations are applied
RUN dotnet ef migrations list --startup-project backend/backend.csproj


# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS webapi-runtime
WORKDIR /app
COPY --from=webapi-build /app/out ./

# Expose the port your application will run on
EXPOSE 80

# Start the application
WORKDIR /app
ENTRYPOINT ["dotnet", "backend.dll"]