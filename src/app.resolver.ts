import {
  Field,
  ID,
  ObjectType,
  Resolver,
  Query,
  Mutation,
  Args,
  InputType,
} from '@nestjs/graphql';
import { AppService } from './app.service';

@ObjectType('Todo')
export class TodoType {
  @Field(() => ID)
  id: string;

  @Field()
  text: string;

  @Field()
  done: boolean;
}

@InputType()
class TodoUpdate {
  @Field({ nullable: true })
  text: string;

  @Field({ nullable: true })
  done: boolean;
}

@InputType()
class TodoCreate {
  @Field()
  id: string;

  @Field()
  text: string;

  @Field()
  done: boolean;
}

@Resolver(() => TodoType)
export class AppResolver {
  constructor(private service: AppService) {}

  @Query(() => TodoType)
  todo(@Args('id') id: string) {
    return this.service.get(id);
  }

  @Query(() => [TodoType])
  todos() {
    return this.service.all();
  }

  @Mutation(() => TodoType)
  updateTodo(@Args('id') id: string, @Args('data') data: TodoUpdate) {
    return this.service.update(id, data);
  }

  @Mutation(() => TodoType)
  createTodo(@Args('data') data: TodoCreate) {
    return this.service.create(data);
  }
}
